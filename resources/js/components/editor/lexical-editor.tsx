import React, { useEffect, useCallback } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { 
  EditorState, 
  $getSelection, 
  $isRangeSelection, 
  $getRoot, 
  TextFormatType,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
  $createTextNode,
} from "lexical";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3, Quote, Code } from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme = {
  paragraph: "text-base",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  heading: {
    h1: "text-4xl font-bold mb-4",
    h2: "text-3xl font-bold mb-3",
    h3: "text-2xl font-bold mb-2",
  },
};

function ErrorBoundary(props: { children: React.ReactNode }) {
  return <div>Error</div>;
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isList, setIsList] = React.useState(false);
  const [isOrderedList, setIsOrderedList] = React.useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsList(selection.hasFormat('list'));
      setIsOrderedList(selection.hasFormat('ordered-list'));
    }
  }, []);

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }: { editorState: EditorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatText = useCallback((format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  }, [editor]);

  const formatList = useCallback((type: 'ordered' | 'unordered') => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const nodes = selection.getNodes();
      nodes.forEach(node => {
        if (type === 'ordered') {
          node.insertAfter();
        } else {
          node.insertAfter();
        }
      });
    }
  }, [editor]);

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b">
      <Button
        type="button"
        variant={isBold ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatText('bold')}
        className="h-8 w-8 p-0"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={isItalic ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatText('italic')}
        className="h-8 w-8 p-0"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={isUnderline ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatText('underline')}
        className="h-8 w-8 p-0"
      >
        <Underline className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => formatText('strikethrough')}
        className="h-8 w-8 p-0"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => formatText('subscript')}
        className="h-8 w-8 p-0"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => formatText('superscript')}
        className="h-8 w-8 p-0"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        type="button"
        variant={isList ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatList('unordered')}
        className="h-8 w-8 p-0"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={isOrderedList ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatList('ordered')}
        className="h-8 w-8 p-0"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => formatText('underline')}
        className="h-8 w-8 p-0"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => formatText('underline')}
        className="h-8 w-8 p-0"
      >
        <Code className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function LexicalEditor({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError(error: Error) {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeHighlightNode,
      CodeNode,
      LinkNode,
      AutoLinkNode,
    ],
  };

  const handleEditorChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      onChange(textContent);
    });
  };

  useEffect(() => {
    const editor = document.querySelector('.LexicalComposer');
    if (editor && value) {
      const root = $getRoot();
      root.clear();
      root.append($createParagraphNode().append($createTextNode(value)));
    }
  }, [value]);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded-md">
        <ToolbarPlugin />
        <div className="p-2">
          <RichTextPlugin
            contentEditable={<ContentEditable className="min-h-[150px] w-full outline-none" />}
            placeholder={<div className="text-gray-400">Type here...</div>}
            ErrorBoundary={ErrorBoundary}
          
          />
          <OnChangePlugin onChange={handleEditorChange} />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
