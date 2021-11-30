import {useRef, memo} from "react";
import {Editor} from "@tinymce/tinymce-react";

// @ts-ignore
const RichText = memo(({onChange, initial = ''}) => {
  const editorRef = useRef(null);
  return (
    <Editor
      onEditorChange={onChange}
      onInit={(evt, editor) => {
        // @ts-ignore
        editorRef.current = editor
      }}
      initialValue={initial}
      init={{
        // @ts-ignore
        selector: 'textarea#full-featured-non-premium',
        plugins: 'print preview paste searchreplace autolink autosave save directionality code visualblocks fullscreen link table charmap hr pagebreak nonbreaking toc insertdatetime lists wordcount textpattern noneditable charmap quickbars emoticons',
        menubar: 'file edit view insert format tools table',
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | link | ltr rtl',
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: 600,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        contextmenu: 'link table',
        skin: 'oxide',
        content_css: 'default',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        init_instance_callback : function(editor) {
          const freeTiny = document.querySelector('.tox .tox-notification--in');
          if(freeTiny && freeTiny['style']) freeTiny['style'].display = 'none';
        }
      }}
    />
  )
})

export default RichText;
