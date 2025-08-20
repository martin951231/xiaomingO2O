/**
 * 商场
 */
const buildingPlatformComponents = {
  // 商场管理
  'SystemBuildingPlatformShoppingMall': () => import('@/views/building/platform/shoppingMall'),
  // 商场装修
  'SystemBuildingPlatformDecorate': () => import('@/views/building/platform/homeDecorate'),

  // 拍照积分
  'SystemBuildingPlatformTicketPoint': () => import('@/views/building/platform/ticketPoint'),
}
export default buildingPlatformComponents