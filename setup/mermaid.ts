import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
  return {
    theme: 'base',
    themeVariables: {
      // Base theme settings
      darkMode: false,
      background: '#1a1a1a',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '16px',

      // Primary colors and derivatives
      primaryColor: '#5581e8',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#5581e8',
      secondaryColor: '#3ecc8b',
      secondaryTextColor: '#ffffff',
      secondaryBorderColor: '#3ecc8b',
      tertiaryColor: '#2c3e50',
      tertiaryTextColor: '#ffffff',
      tertiaryBorderColor: '#2c3e50',

      // General elements
      lineColor: '#5581e8',
      textColor: '#ffffff',
      mainBkg: '#2c3e50',
      errorBkgColor: '#ef4444',
      errorTextColor: '#ffffff',

      // Notes
      noteBkgColor: '#2c3e50',
      noteTextColor: '#ffffff',
      noteBorderColor: '#5581e8',

      // Flowchart specific
      nodeBorder: '#5581e8',
      clusterBkg: '#1a1a1a',
      clusterBorder: '#3ecc8b',
      defaultLinkColor: '#5581e8',
      titleColor: '#ffffff',
      edgeLabelBackground: '#2c3e50',
      nodeTextColor: '#ffffff',

      // Sequence diagram
      actorBkg: '#2c3e50',
      actorBorder: '#5581e8',
      actorTextColor: '#ffffff',
      actorLineColor: '#5581e8',
      signalColor: '#ffffff',
      signalTextColor: '#ffffff',
      labelBoxBkgColor: '#2c3e50',
      labelBoxBorderColor: '#5581e8',
      labelTextColor: '#ffffff',
      loopTextColor: '#ffffff',
      activationBorderColor: '#3ecc8b',
      activationBkgColor: '#2c3e50',
      sequenceNumberColor: '#ffffff',

      // State diagram
      labelColor: '#ffffff',
      altBackground: '#1a1a1a',

      // Class diagram
      classText: '#ffffff',

      // Pie chart colors
      pie1: '#5581e8',
      pie2: '#3ecc8b',
      pie3: '#2c3e50',
      pie4: '#64748b',
      pie5: '#4b6bda',
      pie6: '#35b67c',
      pie7: '#3f4f63',
      pie8: '#526480',
      pie9: '#7c9aef',
      pie10: '#4ddbaa',
      pie11: '#1a2433',
      pie12: '#2c3e50',
      pieTitleTextSize: '25px',
      pieTitleTextColor: '#ffffff',
      pieSectionTextSize: '17px',
      pieSectionTextColor: '#ffffff',
      pieLegendTextSize: '17px',
      pieLegendTextColor: '#ffffff',
      pieStrokeColor: '#1a1a1a',
      pieStrokeWidth: '2px',
      pieOuterStrokeWidth: '2px',
      pieOuterStrokeColor: '#1a1a1a',
      pieOpacity: '0.7',

      // Journey colors
      fillType0: '#5581e8',
      fillType1: '#3ecc8b',
      fillType2: '#2c3e50',
      fillType3: '#64748b',
      fillType4: '#4b6bda',
      fillType5: '#35b67c',
      fillType6: '#3f4f63',
      fillType7: '#526480'
    }
  }
})