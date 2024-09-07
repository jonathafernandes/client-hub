import Header from "./_components/header";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="flex-grow">
        {/* Seu conteúdo principal vai aqui */}
      </main>

      <Footer />
    </div>
  );
}
