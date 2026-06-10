import PersonalInfoForm from './SectionForms/PersonalInfoForm';
import SummaryForm from './SectionForms/SummaryForm';
import ExperienceForm from './SectionForms/ExperienceForm';
import EducationForm from './SectionForms/EducationForm';
import SkillsForm from './SectionForms/SkillsForm';
import CertificationsForm from './SectionForms/CertificationsForm';
import ProjectsForm from './SectionForms/ProjectsForm';
import LanguagesForm from './SectionForms/LanguagesForm';
import AwardsForm from './SectionForms/AwardsForm';
import VolunteerForm from './SectionForms/VolunteerForm';
import CustomSectionForm from './SectionForms/CustomSectionForm';

const formComponents = {
    personal: PersonalInfoForm,
    summary: SummaryForm,
    experience: ExperienceForm,
    education: EducationForm,
    skills: SkillsForm,
    certifications: CertificationsForm,
    projects: ProjectsForm,
    languages: LanguagesForm,
    awards: AwardsForm,
    volunteer: VolunteerForm,
    custom: CustomSectionForm,
};

export default function SectionForm({ type, data, label, onChange, onLabelChange }) {
    const Component = formComponents[type];

    if (!Component) {
        return <p className="text-sm text-gray-500">Unknown section type: {type}</p>;
    }

    return <Component data={data} label={label} onChange={onChange} onLabelChange={onLabelChange} />;
}
