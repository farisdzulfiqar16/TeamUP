import PageLayout from "../components/PageLayout";
import EmptyState from "../components/EmptyState";

function Pesan() {
  return (
    <PageLayout title="Pesan">
      <EmptyState
        title="Belum ada pesan"
        desc="Mulai percakapan dengan tim kamu"
      />
    </PageLayout>
  );
}

export default Pesan;
