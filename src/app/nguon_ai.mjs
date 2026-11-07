import {createHash} from 'node:crypto';
import {precomputed} from './nguon_ai_embedded.mjs';
export const tasks={
 AI02:{folder:'AI02_JD_TIN_DANG',index:0,company:[1,2,5,7,8],policy:[1,2,3,4,5,7,13,14]},
 AI05:{folder:'AI05_SANG_LOC_CV',index:1,company:[6,7,8],policy:[1,6,15]},
 AI07:{folder:'AI07_CAU_HOI_PV',index:2,company:[3,7,8],policy:[1,7,14]},
 AI10:{folder:'AI10_THU_MOI_NHAN_VIEC',index:3,company:[2,3,5,7,8],policy:[2,3,5,8,9,10,11,13,14]},
 AI13:{folder:'AI13_KE_HOACH_HOI_NHAP',index:4,company:[2,3,7,8],policy:[2,3,8,12,13,14]},
};
export function sources(task){
 if (precomputed[task]) return structuredClone(precomputed[task]);
 throw Error('UNKNOWN_TASK');
}
export function policyText(){
 return precomputed.policy;
}
