import Home from './Home.vue'
import UserDetail from './UserDetail.vue'
import Introduction from './Introduction.vue'
import Instruction from './Instruction.vue'
import VerifyCerticiate from './VerifyCerticiate.vue'
import CertificateChain from './CertificateChain.vue'
import AccountChain from './AccountChain.vue'
import Login from './Login.vue'
import Verifier from './verifier/Verifier.vue'
import Holder from './holder/Holder.vue'
import Issuer from './issuer/Issuer.vue'

export default [
  { path: '/', component: Home },
  { path: '/user/:userId', component: UserDetail },
  { path: '/introduction', component: Introduction },
  { path: '/instruction', component: Instruction },
  { path: '/verify-certificate', component: VerifyCerticiate },
  { path: '/certificate-chain', component: CertificateChain },
  { path: '/account-chain', component: AccountChain },
  { path: '/login', component: Login },
  { path: '/verifier', component: Verifier, meta: { userType: 'Verifier' } },
  { path: '/holder', component: Holder, meta: { userType: 'Holder' } },
  { path: '/issuer', component: Issuer, meta: { userType: 'Issuer' } },
]