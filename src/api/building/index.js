const buildingPlatformApi = {
  'getShoppingMallLists': '/building/platform.ShoppingMall/getLists', // 获取商场列表
  'changeShoppingMallStus': '/building/platform.ShoppingMall/changeStatus', //更改商场状态
  'getShoppingMall': '/building/platform.ShoppingMall/detail',  //获取商场详情
  'getBindStoreLists': '/building/platform.ShoppingMall/getBindStore',  //获取绑定店铺
  'getBindAdminUserLists': '/building/platform.ShoppingMall/getBindAdminUser',  //获取绑定管理员
  'changeBindAdminUserStatus': '/building/platform.ShoppingMall/changeBindStatus',  //解绑管理员

  'decorate': '/building/platform.ShoppingMall/decorate',  //装修数据

  'getAdverLists': '/building/platform.ShoppingMall/getAdverLists', // 获取轮播图列表
  'getAdver': '/building/platform.ShoppingMall/getAdver', ////获取轮播图详情
  'saveAdver': '/building/platform.ShoppingMall/saveAdver', // 保存轮播图
  'delAdver': '/building/platform.ShoppingMall/delAdver', // 删除轮播图

  'setMallConfig': '/building/platform.ShoppingMall/setMallConfig', // 设置底部导航文字颜色

  'getGuessYouLike': '/building/platform.ShoppingMall/getGuessYouLike', // 获取猜你喜欢设置
  'setGuessYouLike': '/building/platform.ShoppingMall/setGuessYouLike', // 设置猜你喜欢

  'saveTicketPointConfig': '/building/platform.ShoppingMall/saveTicketPointConfig', // 保存积分拍照基础配置
  'getTicketPointConfig': '/building/platform.ShoppingMall/getTicketPointConfig', // 获取积分拍照基础配置

  'getTicketPointLists': '/building/platform.ShoppingMall/getTicketPointLists', // 获取积分拍照申请记录
  'getTicketPointDetail': '/building/platform.ShoppingMall/getTicketPointDetail', // 获取积分拍照申请详情
  'handleTicketPoint': '/building/platform.ShoppingMall/handleTicketPoint', // 审核积分拍照申请
  'calTicketGetScore': '/building/platform.ShoppingMall/calTicketGetScore', // 根据金额预估获取积分数量
  'handleTicketPointLogs': '/building/platform.ShoppingMall/handleTicketPointLogs', // 审核记录
}
export default buildingPlatformApi