import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/TextEditor.module.css';

import {
  BsTypeBold,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
  BsCodeSlash,
  BsQuote,
  BsListUl,
  BsListOl,
  BsDashLg,
  BsImage,
  BsLink45Deg,
  BsTextLeft,
  BsTextCenter,
  BsTextRight,
  BsTextParagraph,
} from 'react-icons/bs';

const TextEditor = ({ setContent, content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const inputRef = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.onerror = () => {
        console.log('Error');
      };
    }
  };
  //   hndle links
  const handleLinkInput = () => {
    const url = window.prompt('Please enter URL');
    // const url = inputRef.current.value.trim();
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  //   add image handle
  const addImage = () => {
    const url = window.prompt('Please enter image URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
        >
          <BsTypeBold />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <BsTypeItalic />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
        >
          <BsTypeUnderline />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <BsTypeStrikethrough />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
        >
          <BsCodeSlash />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <BsQuote />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <BsListUl />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <BsListOl />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          <BsTypeH1 />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <BsTypeH2 />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <BsTypeH3 />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHorizontalRule().run();
          }}
        >
          <BsDashLg />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            addImage();
          }}
        >
          <BsImage />
        </button>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          style={{ display: 'none' }}
          ref={inputRef}
          onChange={handleFileInput}
        />
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            handleLinkInput();
          }}
        >
          <BsLink45Deg />
        </button>

        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('left').run();
          }}
        >
          <BsTextLeft />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('center').run();
          }}
        >
          <BsTextCenter />
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('right').run();
          }}
        >
          <BsTextRight />
        </button>
      </div>
      <EditorContent className={styles.editor} editor={editor} />
    </div>
  );
};

export default TextEditor;
