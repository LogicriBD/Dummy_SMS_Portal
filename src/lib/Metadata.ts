import { commonMetadata } from '@/config/data/metadata'
import { Metadata, ResolvingMetadata } from 'next'

/**
 * A type representing the metadata properties for a page.
 *
 * @typedef MetadataType
 * @property {string} pageTitle - The title of the page.
 * @property {string} description - A brief description of the page content.
 * @property {string[]} keywords - An array of keywords relevant to the page for SEO purposes.
 */
export type MetadataType = {
  pageTitle: string
  description: string
  keywords: string[]
}

/**
 * A type representing the props object passed to the `generateDynamicMetadata` function.
 *
 * @typedef Props
 * @property {Promise<any>} params - A promise that resolves to an object containing route-specific parameters.
 * @property {Promise<{ [key: string]: string | string[] | undefined }>} searchParams - A promise that resolves to an object containing search query parameters.
 */
export type Props = {
  params: Promise<any>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

/**
 * Generates static metadata for a page using predefined common metadata.
 *
 * @param props - An object containing metadata details specific to the page.
 * @param props.pageTitle - The title of the page, which will be appended to the common title.
 * @param props.description - A brief description of the page content.
 * @param props.keywords - An array of keywords relevant to the page for SEO purposes.
 * @returns A `Metadata` object containing the page title, description, icons, authors, and keywords.
 */
export const generateStaticMetadata = (props: MetadataType): Metadata => {
  return {
    title: `${commonMetadata.title} | ${props.pageTitle}`,
    description: `${props.description} \n${commonMetadata.description}`,
    icons: [
      {
        url: 'logo.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
    ],
    authors: commonMetadata.authors,
    keywords: [...commonMetadata.keywords, ...props.keywords],
  }
}

export type DynamicMetadataCallback = ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => Promise<
  MetadataType & {
    imageUrl?: string[]
  }
>

/**
 * Generates dynamic metadata based on the provided callback function and parameters.
 *
 * @param callback - A function that takes route parameters and search parameters as input
 *                   and returns a promise resolving to metadata properties.
 * @param args - An object containing route parameters and optional search parameters.
 * @param args.params - A promise that resolves to an object containing route-specific parameters.
 * @param args.searchParams - A promise that resolves to an object containing search query parameters.
 * @param parent - A `ResolvingMetadata` object representing the metadata from the parent scope,
 *                 which can be used to inherit existing metadata properties.
 * @returns A promise that resolves to a `Metadata` object with dynamically generated values,
 *          including OpenGraph properties if applicable.
 */
export const generateDynamicMetadata = async (
  callback: DynamicMetadataCallback,
  args: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const params = await args.params
  const searchParams = await args.searchParams
  const props = await callback({ params, searchParams })
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: `${commonMetadata.title} | ${props.pageTitle}`,
    description: `${props.description} \n${commonMetadata.description}`,
    icons: [
      {
        url: 'logo.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
    ],
    authors: commonMetadata.authors,
    keywords: [...commonMetadata.keywords, ...props.keywords],
    openGraph: {
      url: process.env.NEXT_PUBLIC_BASE_URL,
      type: 'website',
      title: `${commonMetadata.title} | ${props.pageTitle}`,
      description: `${props.description} \n${commonMetadata.description}`,
      images: [
        ...previousImages,
        ...(props.imageUrl?.map(url => ({
          url,
        })) || []),
      ],
    },
  }
}
