import { useRef } from "react";
import { memo } from "react";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { resetJson, setIsDirty, setJson, useJsonEdit } from "./slice";
import store from "../../store/store";
export const JsonEdit = memo(() => {
  const {
    json
  } = useJsonEdit();
  const currentJson = useRef(json || '{}');
  const [data, setData] = useState(JSON.parse(currentJson.current));
  useEffect(() => {
    currentJson.current = json || '{}';
  }, [json]);
  useEffect(() => {
    let parsedJson;
    try {
      parsedJson = JSON.parse(currentJson.current);
    } catch (err) {
      throw new Error('Invalid JSON');
    }
    if (currentJson.current !== '{}' && currentJson.current !== json) {
      store.dispatch(setIsDirty(true));
      store.dispatch(setJson(currentJson.current));
    }
    console.log('parsedJson', parsedJson);
    setData(parsedJson);
  }, [currentJson.current]);
  const onInputChange = (e: any) => {
    const {
      id,
      value
    } = e.target;
    const newData = {
      ...data,
      [id]: value
    };
    const newJson = JSON.stringify(newData);
    if (newJson !== currentJson.current) {
      currentJson.current = newJson;
    }
  };
  const onReset = () => {
    store.dispatch(resetJson(""));
  };
  return <Form>
      {Object.keys(data).map(key => {
      return <Form.Group key={key} className="mb-3">
            <Form.Label>{key}</Form.Label>
            <Form.Control type="text" id={key} defaultValue={data[key]} onChange={onInputChange} />
          </Form.Group>;
    })}
      {Object.keys(data).length ? <Form.Control type="reset" onClick={onReset} /> : null}
    </Form>;
});