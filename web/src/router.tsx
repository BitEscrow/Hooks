import { Routes, Route } from 'react-router-dom'

import DraftCreate    from '@/components/DraftCreate'
import DraftDetail    from '@/components/DraftDetail'
import DraftView      from '@/components/DraftView'
import ContractDetail from '@/components/ContractDetail'
import ContractView   from '@/components/ContractView'
import DepositDetail  from './components/DepositDetail'
import DepositView    from '@/components/DepositView'
import SettingsView   from '@/components/settings'
import Error404View   from '@/components/404'

export default function () {
  return (
    <Routes>
      <Route path="/"               element={<DraftView      />} />
      <Route path="/contracts"      element={<ContractView   />} />
      <Route path="/contracts/:cid" element={<ContractDetail />} />
      <Route path="/deposits"       element={<DepositView    />} />
      <Route path="/deposits/:dpid" element={<DepositDetail  />} />
      <Route path="/drafts"         element={<DraftView      />} />
      <Route path="/drafts/:sid"    element={<DraftDetail    />} />
      <Route path="/drafts/new"     element={<DraftCreate    />} />
      <Route path="/settings"       element={<SettingsView   />} />
      <Route path="/404"            element={<Error404View   />} />
    </Routes>
  )
}
