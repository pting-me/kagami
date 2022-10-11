import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { matchSorter } from 'match-sorter';
import { FC, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useThrottle from 'react-use/lib/useThrottle';
import * as yup from 'yup';

import {
  HtmlElementTag,
  SvgElementTag,
  htmlElementTagNameMap,
  svgElementTagNameMap,
} from '@kagami/types';

import postMessageToSandbox from '../../pubsub/postMessageToSandbox';
import useLogger from '../../utils/useLogger';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import './DownloadForm.css';

interface Props {
  id: string;
}

interface FormInputs {
  tagName: string;
  isForwardRef: boolean;
  elementContext: 'html' | 'svg';
}

const tagNames: Record<FormInputs['elementContext'], string[]> = {
  html: Object.keys(htmlElementTagNameMap),
  svg: Object.keys(svgElementTagNameMap),
};

const schema = yup
  .object({
    tagName: yup
      .string()
      .required('Tag name is required')
      .when('elementContext', {
        is: 'html',
        then: (schema) =>
          schema.oneOf(tagNames['html'], 'Tag name must be a valid HTML tag'),
      })
      .when('elementContext', {
        is: 'svg',
        then: (schema) =>
          schema.oneOf(tagNames['svg'], 'Tag name must be a valid SVG tag'),
      }),
  })
  .required();

const useTagNameMatch = ({
  tagName,
  elementContext,
}: Pick<FormInputs, 'tagName' | 'elementContext'>) => {
  const throtTagName = useThrottle(tagName, 100);

  return useMemo(
    () =>
      throtTagName.trim() === ''
        ? null
        : matchSorter(tagNames[elementContext], throtTagName),
    [throtTagName, elementContext]
  );
};

const DownloadForm: FC<Props> = (props: Props) => {
  const { id } = props;
  const logger = useLogger();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      tagName: '',
      isForwardRef: false,
      elementContext: 'html',
    },
    resolver: yupResolver(schema),
  });
  const [tagName, elementContext, isForwardRef] = watch([
    'tagName',
    'elementContext',
    'isForwardRef',
  ]);

  const onSubmit = (data: FormInputs) => {
    logger.log('Downloading...');
    logger.log(data);
    const verifiedTag = tagName as HtmlElementTag | SvgElementTag;
    postMessageToSandbox({
      type: 'generateCode',
      payload: { id, tagName: verifiedTag, isForwardRef, elementContext },
    });
  };
  const popoverRef = useRef<HTMLDivElement & { 'data-state': string }>(null);

  const results = useTagNameMatch({ tagName, elementContext });

  return (
    <div className="p-4">
      <h3 className="font-bold pb-4">Download options</h3>
      {/* This is the expected implementation for react-hook-form */}
      {/* https://github.com/react-hook-form/react-hook-form/discussions/8020 */}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-4 flex items-center">
          <Checkbox
            id="is-forward-ref"
            type="checkbox"
            className="kagami absolute"
            {...register('isForwardRef')}
          />
          <label htmlFor="is-forward-ref" className="mx-2">
            With ForwardRef
          </label>
        </div>
        <div className="pb-4 flex items-center">
          <Radio
            type="radio"
            id="html-context"
            value="html"
            className="kagami absolute"
            {...register('elementContext')}
          />
          <label htmlFor="html-context" className="mx-2">
            HTML
          </label>
          <Radio
            type="radio"
            id="without-ref"
            value="svg"
            className="kagami absolute"
            {...register('elementContext')}
          />
          <label htmlFor="svg-context" className="mx-2">
            SVG
          </label>
        </div>
        <div>
          <div className="pb-2">
            <label htmlFor="kagami--download-form-tag-name">Tag name</label>
          </div>
          <Combobox id="kagami--download-form-tag-name">
            <ComboboxInput
              {...register('tagName', { required: true })}
              className="border border-border-strong rounded p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-brand"
            />
            {results && (
              <ComboboxPopover
                ref={popoverRef}
                className="kagami--download-form-popover bg-bg border border-border-strong"
              >
                {results.length > 0 ? (
                  <ComboboxList>
                    {results.slice(0, 10).map((result, index) => (
                      <ComboboxOption
                        key={index}
                        value={result}
                        className="p-1 hover:bg-bg-hover"
                      />
                    ))}
                  </ComboboxList>
                ) : (
                  <div className="p-1">No results found</div>
                )}
              </ComboboxPopover>
            )}
          </Combobox>
          <div className="h-4 mb-2 text-text-danger">
            {errors.tagName?.message}
          </div>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="flex h-4 p-4 border border-border-strong rounded items-center justify-center gap-2"
            aria-label="Download React code"
          >
            <div className="h-4 w-4">
              <ArrowDownTrayIcon />
            </div>
            <div>Download React code</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DownloadForm;
