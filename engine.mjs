export const mean=a=>a.reduce((s,x)=>s+x,0)/a.length;
export const median=a=>{const b=[...a].sort((x,y)=>x-y),n=b.length;return n%2?b[(n-1)/2]:(b[n/2-1]+b[n/2])/2;};
export function modes(a){const counts=new Map();for(const x of a)counts.set(x,(counts.get(x)||0)+1);const n=Math.max(...counts.values());return n===1?[]:[...counts].filter(([,v])=>v===n).map(([k])=>k).sort((a,b)=>a-b);}
export function targets(o){return o.rule==='mean'?[mean(o.data)]:o.rule==='median'?[median(o.data)]:modes(o.data);}
export const make=(order,quantity,packed=false)=>({kind:'make',order,quantity,packed});
export const ship=(route='fast')=>({kind:'ship',route});
export const createState=l=>({tick:0,coins:l.coins,cargo:[],done:[],status:'playing',mistakes:0,losses:0});
export function act(l,state,a){const s=structuredClone(state),reject=message=>({ok:false,state,message});if(s.status!=='playing')return reject('하루가 끝났어요. 다시 시작할 수 있어요.');let message='';
 if(a.kind==='make'){
  const o=l.orders[a.order];if(!o||s.done.includes(a.order)||s.cargo.some(b=>b.order===a.order))return reject('아직 만들지 않은 주문을 골라주세요.');
  if(!Number.isInteger(a.quantity)||a.quantity<1||a.quantity>30)return reject('등불은 1개부터 30개까지 만들 수 있어요.');
  if(s.cargo.length>=2)return reject('수레는 상자 두 개까지만 실어요. 먼저 보내세요.');
  const cost=a.quantity+(a.packed?2:0);if(cost>s.coins)return reject('제작비가 부족해요. 작은 주문의 보상을 먼저 받을 수 있을까요?');
  s.coins-=cost;s.tick++;s.cargo.push({order:a.order,quantity:a.quantity,packed:!!a.packed});message=`${o.name} 상자를 실었어요. ${cost}동전 사용. 수량은 배송할 때 확인해요.`;
 }else if(a.kind==='ship'){
  if(!s.cargo.length)return reject('먼저 상자를 만들어 수레에 실어주세요.');if(!['fast','safe'].includes(a.route))return reject('배송길을 선택해 주세요.');
  s.tick+=a.route==='safe'?2:1;const storm=a.route==='fast'&&l.wind.includes(s.tick),parts=[];
  for(const b of s.cargo){const o=l.orders[b.order];if(storm&&!b.packed){s.losses++;parts.push(`${o.name}: 돌풍에 상자를 잃었어요`);}else if(s.tick>o.deadline){s.losses++;parts.push(`${o.name}: 약속보다 늦었어요`);}else if(!targets(o).includes(b.quantity)){s.mistakes++;parts.push(`${o.name}: 자료와 주문 목적에 맞지 않는 수량이에요`);}else{s.done.push(b.order);s.coins+=o.reward;parts.push(`${o.name} 완료! +${o.reward}동전`);}}
  s.cargo=[];message=parts.join(' · ');
 }else if(a.kind==='wait'){s.tick++;message='한 차례 쉬며 바람이 바뀌기를 기다렸어요.';}else return reject('알 수 없는 행동이에요.');
 if(s.done.length===l.orders.length)s.status='won';else if(s.tick>=l.close||l.orders.some((o,i)=>!s.done.includes(i)&&s.tick>=o.deadline))s.status='lost';
 return {ok:true,state:s,message};
}
export function replay(l,plan){let s=createState(l);for(const a of plan){const r=act(l,s,a);if(!r.ok)return r;s=r.state;}return {ok:true,state:s};}
