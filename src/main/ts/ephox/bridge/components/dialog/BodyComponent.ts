import { BarApi, Bar } from './Bar';
import { ButtonApi, Button } from './Button';
import { CheckboxApi, Checkbox } from './Checkbox';
import { TextAreaApi, TextArea } from './Textarea';
import { InputApi, Input } from './Input';
import { SelectBoxApi, SelectBox } from './SelectBox';
import { SizeInputApi, SizeInput } from './SizeInput';
import { IframeApi, Iframe } from './Iframe';
import { UrlInputApi, UrlInput } from './UrlInput';
import { DropZoneApi, DropZone } from './Dropzone';
import { ColorInputApi, ColorInput } from './ColorInput';
import { GridApi, Grid } from './Grid';
import { ColorPickerApi, ColorPicker } from './ColorPicker';
import { ImageToolsApi, ImageTools } from './ImageTools';
import { AlertBannerApi, AlertBanner } from './AlertBanner';
import { CollectionApi, Collection } from './Collection';
import { LabelApi, Label } from './Label';
import { TableApi, Table } from './Table';

export type BodyComponentApi
  = BarApi
  | ButtonApi
  | CheckboxApi
  | TextAreaApi
  | InputApi
  | SelectBoxApi
  | SizeInputApi
  | IframeApi
  | UrlInputApi
  | DropZoneApi
  | ColorInputApi
  | GridApi
  | ColorPickerApi
  | ImageToolsApi
  | AlertBannerApi
  | CollectionApi
  | LabelApi
  | TableApi;

export type BodyComponent
  = Bar
  | Button
  | Checkbox
  | TextArea
  | Input
  | SelectBox
  | SizeInput
  | Iframe
  | UrlInput
  | DropZone
  | ColorInput
  | Grid
  | ColorPicker
  | ImageTools
  | AlertBanner
  | Collection
  | Label
  | Table;