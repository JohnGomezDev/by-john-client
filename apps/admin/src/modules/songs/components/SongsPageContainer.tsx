import { ListPageHeader } from '@/modules/common/components/ListPageHeader';

import { FavoriteSongSection } from './FavoriteSongSection';
import { SongsSearchSection } from './SongsSearchSection';

export function SongsPageContainer(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <ListPageHeader title="Canciones" />

      <FavoriteSongSection />

      <SongsSearchSection />
    </div>
  );
}
