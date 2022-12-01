import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec: any;
  // @ts-ignore
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Lens Lists API',
        version: '0.1.0',
        description:
          'Draft specification for managing lists on Lens Protocol. Beware of possible breaking changes.',
      },
    },
    schemaFolders: ['models'],
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
