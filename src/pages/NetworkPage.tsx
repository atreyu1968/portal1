import { useParams } from 'react-router-dom';
import { useContentStore } from '@/lib/store/content';
import { BackButton } from '@/components/ui/back-button';
import { Footer } from '@/components/layout/Footer';
import { PageEditor } from '@/components/editor/PageEditor';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { useAuthStore } from '@/lib/store/auth';

export function NetworkPage() {
  const { slug } = useParams<{ slug: string }>();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { networks, updateNetwork } = useContentStore();
  
  const network = networks?.find(n => n.slug === slug);

  if (!network) {
    return <div>Red no encontrada</div>;
  }

  const handleSave = async (sections: any[]) => {
    if (network) {
      await updateNetwork(network.id, { content: sections });
    }
  };

  return (
    <div className="relative min-h-screen">
      <BackButton />
      <main className="flex-1 pt-16">
        {isAuthenticated ? (
          <div className="container py-8">
            <PageEditor
              pageId={network.id}
              sections={network.content}
              onSave={handleSave}
            />
          </div>
        ) : (
          <div>
            {network.content.map((section) => (
              <SectionRenderer key={section.id} section={section} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}