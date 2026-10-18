import { SectionHead, sectionClass } from "@/components/section-head";
import { RoleTabs } from "./role-tabs";

export function Roles() {
  return (
    <section id="roles" aria-labelledby="roles-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="Who it's for" id="roles-title" title="Each role sees the work that is theirs.">
          Eight roles, from Super Admin to Employee. Access is enforced in the database, not just by hiding menu items,
          and your auditor gets read-only access without a shared password.
        </SectionHead>
        <RoleTabs />
      </div>
    </section>
  );
}
