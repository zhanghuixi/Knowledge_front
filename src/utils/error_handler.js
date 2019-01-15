// 业务错误统一处理类
export default class ErrHandler {
  static GetMeasureListError(error) {
    console.log(error.data);
  }
  static DelMeasureListError(error) {
    console.log(error.data);
  }
  static NetWorkError(error) {
    console.log(error);
  }
  static MessageError(error) {
    console.log(error);
  }
}
