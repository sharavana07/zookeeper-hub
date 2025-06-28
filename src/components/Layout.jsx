import StaffNavbar from "./StaffNavbar";

export default function Layout({ children }) {
  return (
    <>
      <StaffNavbar />
      <main className="p-4">{children}</main>
    </>
  );
}
