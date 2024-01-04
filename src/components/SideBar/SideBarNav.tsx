
import { Stack } from "@chakra-ui/react";
import NavLink from "./NavLink";
import NavSection from "./NavSection";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

export default function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
          <NavSection title="Geral">

            <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
            <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>

          </NavSection>

          <NavSection title="Automação">

            <NavLink icon={RiInputMethodLine} href="/">Formulários</NavLink>
            <NavLink icon={RiGitMergeLine} href="/">Automação</NavLink>

          </NavSection>

        </Stack>
  )
}
