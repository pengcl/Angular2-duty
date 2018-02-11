import {Meta} from './base.model';
import {Butler} from './product.model';

interface Period {
  paid: boolean;
  amount: number;
  meta: {
    createAt: number;
    paidAt: number;
    expireAt: number;
  };
}

export interface OrderList {
  id: string;
  type: number;
  amount: number;
  payState: {
    paid: boolean;
    type: number; // 支付方式 0:支付宝,1:微信,2:银行卡
    periods?: Period[]; // 支付周期
  };
  meta: Meta;
  items: Butler[];
}
