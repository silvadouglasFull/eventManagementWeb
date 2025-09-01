import react from '@vitejs/plugin-react';
import type { AliasOptions } from 'vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
//@ts-ignore
import path from "path";

//@ts-ignore
const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": root,
      "@components": `${root}/components`,
      "@constants/*": `${root}/constants/*`,
      "@core/*": `${root}/core/*`,
      "@assets/*": `${root}/assets/*`,
      "@components/*": `${root}/components/*`,
      "@config/*": `${root}/config/*`,
      "@modules/*": `${root}/modules/*`,
      "@hooks/*": `${root}/hooks/*`,
      "@layouts/*": `${root}/layouts/*`,
      "@pages/*": `${root}/pages/*`,
      "@services/*": `${root}/services/*`,
      "@store/*": `${root}/store/*`,
      "@types/*": `${root}/types/*`,
      "@utils/*": `${root}/utils/*`,
      "@styles/*": `${root}/styles/*`,
      "@navbarPublic/*": `${root}/components/NavbarPublic/*`,
      "@router/*": `${root}/router/*`,
      "@flavor/*": `${root}/flavor/*`
    } as AliasOptions,
  },
})
// end file