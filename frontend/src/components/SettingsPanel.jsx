import '../styles/components/SettingsPanel.css'

function SettingsPanel({
  systemPrompt,
  temperature,
  topP,
  numPredict,
  onSystemPromptChange,
  onTemperatureChange,
  onTopPChange,
  onNumPredictChange,
}) {
  return (
    <section className="settings-panel">
      <h3>설정</h3>
      <label className="settings-field">
        <span>시스템 프롬프트</span>
        <textarea
          value={systemPrompt}
          onChange={(event) => onSystemPromptChange(event.target.value)}
          rows={3}
        />
      </label>

      <div className="settings-grid">
        <label className="settings-field compact">
          <span>temperature</span>
          <input type="number" min="0" max="2" step="0.1" value={temperature} onChange={(event) => onTemperatureChange(Number(event.target.value))} />
        </label>

        <label className="settings-field compact">
          <span>top_p</span>
          <input type="number" min="0" max="1" step="0.1" value={topP} onChange={(event) => onTopPChange(Number(event.target.value))} />
        </label>

        <label className="settings-field compact">
          <span>num_predict</span>
          <input type="number" min="1" max="2048" step="1" value={numPredict} onChange={(event) => onNumPredictChange(Number(event.target.value))} />
        </label>
      </div>
    </section>
  )
}

export default SettingsPanel
