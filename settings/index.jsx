function settingsComponent(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            App Settings
          </Text>
        }
      >
        <TextInput
          label="ID"
          settingsKey="id"
        >
        </TextInput>
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
