import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

export default function NewContact() {
  return (
    <>
      <PageHeader title="Criar novo contato" />

      <ContactForm buttonLabel="Cadastrar" />
    </>
  );
}
