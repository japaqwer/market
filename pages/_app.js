import { Provider } from 'react-redux';
import '../styles/globals.css';
import { store } from '../features/store';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CategoryRoutes from '../features/slices/categoryRotes';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Header />
            <CategoryRoutes />
            <Component {...pageProps} />
            <Footer />
        </Provider>
    );
}

export default MyApp;
