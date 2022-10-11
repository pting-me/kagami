import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { ChangeEvent, FC, MouseEvent, useReducer } from 'react';

import {
  HtmlElementTag,
  htmlElementTagNameMap,
  isHtmlTag,
} from '@kagami/types';

import postMessageToSandbox from '../../pubsub/postMessageToSandbox';

interface FormState {
  invalidInputFields: Record<string, boolean>;
  tagName: HtmlElementTag;
}

interface FormAction {
  type: 'setTagName';
  payload: string;
}

const formReducer = (state: FormState, action: FormAction) => {
  const { type, payload } = action;

  switch (type) {
    case 'setTagName': {
      const { invalidInputFields } = state;
      if (isHtmlTag(payload)) {
        return {
          ...state,
          tagName: payload,
          invalidInputFields: { ...invalidInputFields, tagName: false },
        };
      }
      return {
        ...state,
        invalidInputFields: { ...invalidInputFields, tagName: true },
      };
    }
    default:
      return state;
  }
};

const initState: FormState = {
  invalidInputFields: { tagName: false },
  tagName: 'div',
};

interface Props {
  id: string;
}

const DownloadForm: FC<Props> = (props: Props) => {
  const { id } = props;
  const [state, dispatch] = useReducer(formReducer, initState);

  const handleDownloadClick =
    (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      postMessageToSandbox({ type: 'generateCode', payload: { id } });
    };

  const handleComboboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch({ type: 'setTagName', payload: value });
  };
  return (
    <div className="p-4">
      <div>{JSON.stringify(state)}</div>
      <h2 className="font-bold pb-4">Download options</h2>
      <div className="pb-4">
        <div className="pb-1">
          <label id="tagName">HTML tag name</label>
        </div>
        <Combobox aria-labelledby="tagName" className="">
          <ComboboxInput
            placeholder='e.g. "div"'
            className="border border-border-onbrand rounded px-1"
            defaultValue="div"
            onChange={handleComboboxChange}
          />
          <ComboboxPopover>
            <ComboboxList>
              {Object.keys(htmlElementTagNameMap).map((tagName) => (
                <ComboboxOption value={tagName} />
              ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
      <div>
        <button
          className="flex h-4 p-4 border border-border-onbrand rounded items-center justify-center bg gap-2"
          aria-label="Download React code"
          onClick={handleDownloadClick(id)}
        >
          <div className="h-4 w-4">
            <ArrowDownTrayIcon />
          </div>
          <div>Download React code</div>
        </button>
      </div>
    </div>
  );
};

export default DownloadForm;
