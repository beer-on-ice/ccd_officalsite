import {
  tools
} from '@/utils/tools';
import url from './url';

// 官网资讯分页
export const getNewRecommendN = data => {
  // 接口公参添加
  const cfg = {
    method: 'get',
    url: url.getNewRecommendN,
    data
  };
  return tools.ajax(cfg);
};

// PC官网搜索
export const queryPcInformation = data => {
  // 接口公参添加
  const cfg = {
    method: 'get',
    url: url.queryPcInformation,
    data
  };
  return tools.ajax(cfg);
};
// 根据资讯id查询资讯详情
export const inforDetails = data => {
  // 接口公参添加
  const cfg = {
    method: 'get',
    url: url.inforDetails,
    data
  };
  return tools.ajax(cfg);
};
// 热门资讯
export const hotInformation = data => {
  // 接口公参添加
  const cfg = {
    method: 'get',
    url: url.hotInformation,
    data
  };
  return tools.ajax(cfg);
};
//  推荐阅读
export const recommendInformation = data => {
  // 接口公参添加
  const cfg = {
    method: 'get',
    url: url.recommendInformation,
    data
  };
  return tools.ajax(cfg);
};
export const updateReadCount = data => {
  // 接口公参添加
  const cfg = {
    method: 'post',
    url: url.updateReadCount,
    params:data
  };
  return tools.ajax(cfg);
};
