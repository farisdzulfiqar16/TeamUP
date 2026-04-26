import PageLayout from "../components/PageLayout";

function Profil() {
  return (
    <PageLayout title="Profil">

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-300 rounded-full" />

        <div>
          <h2 className="font-semibold">Faris</h2>
          <p className="text-sm text-gray-500">
            Mahasiswa Informatika
          </p>
        </div>
      </div>

    </PageLayout>
  );
}

export default Profil;
