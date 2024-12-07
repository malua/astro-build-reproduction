export async function loadImage(src: string) {
  if (!src) return null;

  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/images/**/*.{jpeg,jpg,png,gif,avif,svg}",
  );

  if (!images[src]) {
    throw new Error(
      `"${src}" does not exist in glob: "${"/src/assets/images/**/*.{jpeg,jpg,png,gif,avif,svg}"}"`,
    );
  }

  return await images[src]();
}
