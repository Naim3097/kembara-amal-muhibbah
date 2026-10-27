import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { DonationProvider } from './context/DonationContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import CampaignDetail from './pages/CampaignDetail'
import Itineraries from './pages/Itineraries'
import ItineraryDetail from './pages/ItineraryDetail'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Donate from './pages/Donate'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Volunteer from './pages/Volunteer'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <LanguageProvider>
      <DonationProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/campaigns/:slug" element={<CampaignDetail />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/itineraries/:slug" element={<ItineraryDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal kind="privacy" />} />
            <Route path="/terms" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </DonationProvider>
    </LanguageProvider>
  )
}
