import ClassicTemplate from './Templates/ClassicTemplate';
import ModernTemplate from './Templates/ModernTemplate';
import MinimalTemplate from './Templates/MinimalTemplate';
import CreativeTemplate from './Templates/CreativeTemplate';
import ProfessionalTemplate from './Templates/ProfessionalTemplate';
import BlankTemplate from './Templates/BlankTemplate';

const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    professional: ProfessionalTemplate,
    blank: BlankTemplate,
};

export default function TemplateRenderer({ template, sections, settings }) {
    const Component = templates[template] || templates.blank;
    const sortedSections = [...sections].sort((a, b) => a.order - b.order);

    return <Component sections={sortedSections} settings={settings} />;
}
