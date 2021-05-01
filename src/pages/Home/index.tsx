import React, { ChangeEvent, useRef, useState } from "react";
import { Section, SectionTitle } from "./styles";
import { PageContainer, PageTitle } from "../../styles/shared";
import { Modal, ModalRef, Form, Input, TextArea, AppendButtonAdd } from "../../components/ui";
import { observer } from "mobx-react";
import store from "../../store";
import TemplateList from "./TemplatesList";
import LatestTaskList from "./LatestTasksList";
const initialTemplateForm = { name: "", description: "" };

const Home: React.FC = () => {
  const [templateForm, setTemplateForm] = useState(initialTemplateForm);
  const modalRef = useRef<ModalRef>(null);

  function handleUpdateTemplateForm(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value, name } = e.target;
    setTemplateForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitTemplateForm() {
    try {
      await store.templateStore.createTemplate(templateForm);
      setTemplateForm(initialTemplateForm);
      modalRef.current?.setVisibility(false);
    } catch (error) {
      alert(error?.response?.data);
    }
  }

  return (
    <PageContainer>
      <PageTitle>Home</PageTitle>

      <Section>
        <SectionTitle>Latest Tasks</SectionTitle>
        <LatestTaskList />
      </Section>

      <Section>
        <SectionTitle>Your Templates</SectionTitle>
        <TemplateList />
      </Section>

      <AppendButtonAdd
        text="Create new Template"
        onClick={() => modalRef.current?.setVisibility(true)}
      />

      <Modal ref={modalRef} title="New Template" maxWidth="500">
        <Form onSubmit={handleSubmitTemplateForm} buttonText={"Create"}>
          <Input
            focused
            label="Name"
            name="name"
            placeholder="Ex: Daily"
            value={templateForm.name}
            onChange={handleUpdateTemplateForm}
          />

          <TextArea
            label="Description"
            name="description"
            placeholder="Ex: Tasks to do every day"
            value={templateForm.description}
            onChange={handleUpdateTemplateForm}
          />
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default observer(Home);
