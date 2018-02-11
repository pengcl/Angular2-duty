export const PageConfig = {
  'tabBar': {
    'backgroundColor': '#fff',
    'list': [
      {
        'pagePath': '/front/index',
        'iconPath': '/assets/images/tabBar/homepage.png',
        'selectedIconPath': '/assets/images/tabBar/homepage_fill.png',
        'text': '首页',
        'badge': {
          'badge': 0,
          'dot': false
        }
      },
      {
        'pagePath': 'pages/lists/lists',
        'iconPath': '/assets/images/tabBar/createtask.png',
        'selectedIconPath': '/assets/images/tabBar/createtask_fill.png',
        'text': '订购',
        'badge': {
          'badge': 0,
          'dot': false
        }
      },
      {
        'pagePath': '/front/cases',
        'iconPath': '/assets/images/tabBar/financial.png',
        'selectedIconPath': '/assets/images/tabBar/financial_fill.png',
        'text': '案例',
        'badge': {
          'badge': 1,
          'dot': false
        }
      },
      {
        'pagePath': '/front/shoppingCart',
        'iconPath': '/assets/images/tabBar/shoppingcart.png',
        'selectedIconPath': '/assets/images/tabBar/shoppingcart_fill.png',
        'text': '购物车',
        'badge': {
          'badge': 'new',
          'dot': false
        }
      },
      {
        'pagePath': '/admin/index',
        'iconPath': '/assets/images/tabBar/mine.png',
        'selectedIconPath': '/assets/images/tabBar/mine_fill.png',
        'text': '我',
        'badge': {
          'badge': 0,
          'dot': true
        }
      }
    ]
  },
  'navBar': {
    'backgroundTextStyle': 'light',
    'navigationBarBackgroundColor': '#fff',
    'navigationBarTitleText': '订单列表',
    'navigationBarTextStyle': 'black',
    'enablePullDownRefresh': false
  }
};
