// Created by WpZheng

// @time 20230502

import React from 'react';

// 全局
export const CommonContext = React.createContext<{
  articleId: string;
  mediaId?: string;
}>({
  articleId: '0000000',
});
