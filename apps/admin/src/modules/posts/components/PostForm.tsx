'use client';

import { Button } from '@repo/ui/components/ui/button';

import { usePostForm } from '../hooks/use-post-form';
import { PostFormContentSection } from './PostFormContentSection';
import { PostFormExcerptSection } from './PostFormExcerptSection';
import { PostFormHeader } from './PostFormHeader';
import { PostFormOrganizationSection } from './PostFormOrganizationSection';
import { PostFormSeoSection } from './PostFormSeoSection';
import { PostFormSocialSection } from './PostFormSocialSection';
import { PostFormTitleSection } from './PostFormTitleSection';

export function PostForm(): React.JSX.Element {
  const {
    titleField,
    slugField,
    excerptField,
    categoryIdField,
    metaTitleField,
    metaDescriptionField,
    ogImageUrlField,
    control,
    contentRules,
    tagIdsRules,
    onSubmit,
    isPending,
    errors,
  } = usePostForm();

  return (
    <div className="space-y-6">
      <PostFormHeader />

      <form onSubmit={onSubmit} className="space-y-6">
        <PostFormTitleSection
          titleField={titleField}
          slugField={slugField}
          titleError={errors.title?.message}
          slugError={errors.slug?.message}
        />
        <PostFormContentSection
          control={control}
          contentRules={contentRules}
          contentError={errors.content?.message}
        />
        <PostFormExcerptSection
          excerptField={excerptField}
          excerptError={errors.excerpt?.message}
        />
        <PostFormOrganizationSection
          categoryIdField={categoryIdField}
          control={control}
          categoryIdError={errors.categoryId?.message}
          tagIdsRules={tagIdsRules}
          tagIdsError={errors.tagIds?.message}
        />
        <PostFormSeoSection
          metaTitleField={metaTitleField}
          metaDescriptionField={metaDescriptionField}
          metaTitleError={errors.metaTitle?.message}
          metaDescriptionError={errors.metaDescription?.message}
        />
        <PostFormSocialSection ogImageUrlField={ogImageUrlField} />

        <div className="flex justify-end pb-2">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 sm:w-auto"
          >
            {isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </form>
    </div>
  );
}
