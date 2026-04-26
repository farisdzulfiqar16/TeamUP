import PageLayout from "../components/PageLayout";
import EmptyState from "../components/EmptyState";

function Notifikasi() {
  return (
    <PageLayout title="Notifikasi">
      <EmptyState
        title="Tidak ada notifikasi"
        desc="Semua aktivitas akan muncul di sini"
      />
    </PageLayout>
  );
}

export default Notifikasi;
