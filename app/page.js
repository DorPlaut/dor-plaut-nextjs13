import Image from 'next/image';
import styles from './page.module.css';
import TitlesSection from './components/TitlesSection';
import PostsCarusel from './components/PostsCarusel';
import MainSection from './components/MainSection';
import About from './components/About';
import ProductsCarusel from './components/ProductsCarusel';
import { usePostsStore } from '@/store/PostsStore';
import { useProductsStore } from '@/store/productsStrore';

export default function Home() {
  // get data on server side
  // const getBlogPosts = usePostsStore((state) => state.getBlogPosts);
  // const posts = usePostsStore((state) => state.posts);
  // const getPublicProducts = useProductsStore(
  //   (state) => state.getPublicProducts
  // );
  // const products = useProductsStore((state) => state.products);

  return (
    <>
      <TitlesSection>
        <PostsCarusel />
      </TitlesSection>
      <MainSection>
        <About />
      </MainSection>
      <TitlesSection>
        <ProductsCarusel />
      </TitlesSection>
    </>
  );
}
