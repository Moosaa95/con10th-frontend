import OfferCard from "../offers/OfferCard";
import { IOffer } from '@/types/expert';

function Offers({ offers }: { offers: IOffer[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {offers.map((offer, id) => (
        <OfferCard key={id} offer={offer} />
      ))}
    </section>
  );
}

export default Offers;
