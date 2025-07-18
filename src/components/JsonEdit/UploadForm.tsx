import { memo } from "react";
import { Button, Form } from "react-bootstrap";
import { saveAs } from 'file-saver';
import { setFileName, setInitialJson, setIsDirty, setJson, useJsonEdit } from "./slice";
import store from "../../store/store";
export const onFileChange = (e: any) => {
  store.dispatch(setFileName(e.target.value));
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = e => {
      const text = e.target?.result;
      if (text) {
        let json = "Invalid JSON";
        try {
          json = JSON.parse(text as string);
        } catch (err) {
          throw new Error(json);
        }
        store.dispatch(setFileName(file.name));
        store.dispatch(setInitialJson(text));
        store.dispatch(setJson(text));
      }
    };
  }
};
export const onClear = () => {
  store.dispatch(setFileName(""));
  store.dispatch(setJson(""));
  store.dispatch(setIsDirty(false));
};
export const UploadForm = memo(() => {
  const {
    json,
    isDirty,
    fileName
  } = useJsonEdit();
  const onSave = (e: any) => {
    e.preventDefault();
    // save json to file
    const blob = new Blob([json], {
      type: 'application/json'
    });
    saveAs(blob, fileName);
  };
  return <Form onReset={onClear} onSubmit={onSave}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload JSON File</Form.Label>
        <Form.Control type="file" onChange={onFileChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button disabled={!fileName} variant="secondary" type="reset">Clear</Button>
        <Button disabled={!isDirty} variant="primary" type="submit">Save</Button>
      </Form.Group>
    </Form>;
});