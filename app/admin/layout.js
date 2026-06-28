import AdminNav from "@/components/AdminNav";
import { clinic } from "@/clinic.config";

export const metadata = {
  title: `Admin — ${clinic.name}`,
  robots: { index: false, follow: false }, // never let admin pages get indexed
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <AdminNav />
      {children}
    </div>
  );
}
