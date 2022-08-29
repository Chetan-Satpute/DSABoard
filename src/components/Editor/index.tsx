import React, { FC, useEffect, useRef } from "react";
import * as monaco from 'monaco-editor';

// Since packaging is done by you, you need
// to instruct the editor how you named the
// bundles that contain the web workers.
self.MonacoEnvironment = {
	getWorkerUrl: function (_, label) {
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

interface IProps {
  onChange: (s: string) => void;
}
 
const Editor: FC<IProps> = ({ onChange }) => {
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    let editor = monaco.editor.create(containerRef.current, {
      value: '// Hello World',
      language: 'javascript',
      theme: 'vs-dark'
    });

    const changeSubscription = editor.onDidChangeModelContent((_) => {
      onChange(editor.getValue());
    });

    return () => {
      changeSubscription.dispose();
      editor.dispose();
    }

  }, []);

  return <div className="flex-auto overflow-hidden" ref={containerRef}></div>;
};

export default Editor;
