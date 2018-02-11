export interface Dialog {
  title: string;
  content: string;
  confirm: any; // 函数类型
  cancel: any; // 函数类型
}
