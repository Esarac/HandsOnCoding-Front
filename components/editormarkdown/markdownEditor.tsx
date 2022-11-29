import React from "react";
import style from './markdownEditor.module.scss'
import { useState } from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

type Props = {
  /**
   * @param {text} - The text of the MarkdownEditor.
   */
  text: string
  /**
     * @param {arrow function} - A function that handles saving the text.
     */
   save: (element: any) => void

   disable: boolean
}

export default function MarkdownEditor(props: Props) {
  const [value, setValue] = useState<string>(props.text as string);
  return (
    <div>
      <button className={style.customButton} onClick={() => props.save(value)} disabled={props.disable}>
        <i className={style.icon + ' bi bi-file-earmark-code-fill'}></i>
        Save
      </button>
      <div data-color-mode="dark">
        {/*// @ts-ignore*/}
        <MDEditor height={854} value={value} onChange={setValue}/>
      </div>
    </div>
  );
}
