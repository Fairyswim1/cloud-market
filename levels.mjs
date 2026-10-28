import {make as M,ship as S} from './engine.mjs';
const O=(name,rule,data,deadline,reward)=>({name,rule,data,deadline,reward});
export const purposes={median:'크게 튀는 값의 영향을 줄인 가운데 수량으로 한 상자',mean:'조사한 수량의 총합을 조사 횟수로 똑같이 나눈 수량으로 한 상자',mode:'가장 자주 나온 수량으로 한 상자. 공동 1위면 어느 쪽도 가능'};
export const levels=[
 {id:1,title:'처음 여는 가게',coins:6,close:6,wind:[],orders:[O('별꽃 가게','median',[4,2,3],6,5)],tip:'2, 3, 4로 나열하면 가운데는 3. 3개를 만들고 빠른 길로 보내보세요.',decision:'자료를 정렬하고 가운데 수량을 실제 재고로 만들기',plan:[M(0,3),S()]},
 {id:2,title:'유난히 큰 주문',coins:7,close:5,wind:[],orders:[O('평소의 손님','median',[2,3,4,4,22],5,6)],tip:'한 번에 많이 산 특별 손님이 있어요. 평소 손님의 중심을 생각하세요.',decision:'극단적인 값이 평균을 끌어올리는 상황 판단',plan:[M(0,4),S()]},
 {id:3,title:'작은 거래의 힘',coins:3,close:7,wind:[],orders:[O('함께 나눌 등불','mean',[2,2,20],7,4),O('인기 묶음','mode',[2,5,2],4,10)],tip:'큰 주문을 만들 돈이 없어요. 작은 거래로 제작비를 먼저 모아보세요.',decision:'평균·최빈값의 목적 구별과 거래 순서로 자금 확보',plan:[M(1,2),S(),M(0,8),S()]},
 {id:4,title:'바람을 돌아가는 길',coins:8,close:4,wind:[2],orders:[O('구름 탑','median',[5,1,4],3,7)],tip:'도착하는 차례에 돌풍이 불면 포장 없는 상자를 잃어요. 안전한 길은 두 차례예요.',decision:'빠른 길의 도착 시각과 안전한 우회 비교',plan:[M(0,4),S('safe')]},
 {id:5,title:'늦을 수 없는 약속',coins:6,close:2,wind:[2],orders:[O('축제 문지기','mean',[1,2,6],2,8)],tip:'안전한 길로 돌아가면 늦어요. 튼튼한 포장에는 2동전이 더 들어요.',decision:'시간을 아끼기 위해 포장비를 지출',plan:[M(0,3,true),S()]},
 {id:6,title:'공동 1위의 선택',coins:5,close:5,wind:[],orders:[O('두 인기 묶음','mode',[2,5,5,2],3,1),O('나눔 부스','mean',[1,2,9],5,5)],tip:'최빈값이 둘이면 둘 다 수학적으로 맞아요. 다음 주문에 쓸 돈까지 생각하세요.',decision:'동등하게 타당한 대푯값 중 재고 비용을 고려해 선택',plan:[M(0,2),S(),M(1,4),S()]},
 {id:7,title:'두 상자 한 수레',coins:8,close:3,wind:[],orders:[O('서쪽 전망대','median',[1,3,5],3,6),O('동쪽 전망대','mean',[1,4,7],3,6)],tip:'수레는 두 상자를 한 번에 보내요. 한 상자씩 보냈을 때와 도착 차례를 비교하세요.',decision:'재고 두 칸을 활용해 합배송과 개별 배송 비교',plan:[M(0,3),M(1,4),S()]},
 {id:8,title:'하늘빛 축제',coins:4,close:5,wind:[2,5],orders:[O('큰 나눔 부스','mean',[1,2,15],5,5),O('첫 손님','mode',[2,2,5],2,14),O('평소의 장터','median',[25,4,2,5,4],5,5)],tip:'첫 거래로 돈을 모으고, 두 상자를 함께 보내야 해요. 바람과 포장을 끝까지 확인하세요.',decision:'대푯값 선택·자금 순환·포장·돌풍·합배송을 모두 결합',plan:[M(1,2,true),S(),M(0,6,true),M(2,4,true),S()]}
];
