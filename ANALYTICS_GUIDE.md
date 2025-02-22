# Analytics and Experiment Results Guide

This guide explains how to interpret the analytics data from the showtime sort experiment and make data-driven decisions based on the results.

## Analytics Overview

The demo tracks two primary types of events:
1. Page Views: When users load the movie showtimes
2. Showtime Clicks: When users select a specific showtime

## Data Structure

### Event Data
```typescript
interface ViewEvent {
  type: 'view';
  userId: string;
  variation: string;
  timestamp: string;
}

interface ClickEvent {
  type: 'click';
  userId: string;
  variation: string;
  showtime: {
    time: string;
    format: string;
    price: string;
  };
  timestamp: string;
}
```

### Results Format
```json
{
  "variation_1": {
    "clicks": 150,
    "views": 1000,
    "ctr": 15.0
  },
  "variation_2": {
    "clicks": 180,
    "views": 1000,
    "ctr": 18.0
  }
}
```

## Interpreting Results

### Key Metrics

1. **Click-Through Rate (CTR)**
   - Formula: `(clicks / views) * 100`
   - Baseline: Standard sort order (variation_1)
   - Goal: Improve CTR through optimal format ordering

2. **Format Preference**
   - Track which formats get more clicks in each position
   - Consider time-of-day impact on format selection
   - Analyze price sensitivity per format

### Example Analysis

```javascript
// Sample results analysis
const results = {
  "variation_1": { // Standard First
    "clicks": 150,
    "views": 1000,
    "ctr": 15.0,
    "format_clicks": {
      "standard": 80,
      "imax": 40,
      "imax_3d": 20,
      "digital_3d": 10
    }
  },
  "variation_2": { // IMAX 3D First
    "clicks": 180,
    "views": 1000,
    "ctr": 18.0,
    "format_clicks": {
      "imax_3d": 90,
      "imax": 45,
      "standard": 35,
      "digital_3d": 10
    }
  }
};
```

### Insights Example
```
Variation 2 (IMAX 3D First) shows:
- 20% higher overall CTR
- 350% increase in IMAX 3D selections
- 56% decrease in standard format selections
- Similar Digital 3D engagement
```

## Making Decisions

### Statistical Significance

1. **Sample Size Requirements**
   - Minimum users per variation: 1,000
   - Recommended test duration: 2 weeks
   - Required confidence level: 95%

2. **Confidence Calculation**
   ```python
   def is_significant(control_ctr, test_ctr, control_views, test_views):
       # Z-test implementation for statistical significance
       pass
   ```

### Business Impact Analysis

1. **Revenue Implications**
   ```python
   def calculate_revenue_impact(baseline_data, variation_data):
       """
       Calculate potential revenue impact based on:
       - Ticket price differences
       - Change in format selection
       - Historical conversion rates
       """
       pass
   ```

2. **User Experience Considerations**
   - User feedback and complaints
   - Booking completion rates
   - Return visit rates

## Visualization Examples

### CTR Comparison Chart
```
Variation CTR (%)
|
|    ■ 18.0%  Variation 2 (IMAX 3D First)
|    |
|    |
| ■ 15.0%  Variation 1 (Standard First)
|    |
|____|________________
```

### Format Selection Distribution
```
Format Selection %
|
|  ■ Standard
|  ■ IMAX
|  ■ IMAX 3D
|  ■ Digital 3D
|
|     V1    V2    V3    V4
```

## Recommendations Framework

1. **Clear Winner**
   - One variation shows >15% improvement
   - Statistically significant
   - No negative secondary metrics
   → Roll out winning variation

2. **Mixed Results**
   - Different winners by segment
   - Time-dependent performance
   → Consider targeted rollout

3. **No Clear Winner**
   - Similar performance across variations
   - No significant negative impact
   → Keep current sort order, test new hypotheses

## Future Analysis Opportunities

1. **Segmentation Analysis**
   - Theater location
   - Movie genre
   - Time of day
   - User demographics

2. **Advanced Metrics**
   - Time to selection
   - Format switching behavior
   - Price sensitivity
   - Multiple ticket purchases

3. **Correlation Analysis**
   - Weather impact
   - Event timing
   - Local preferences
   - Seasonal trends

## Reporting Templates

### Daily Monitoring Report
```markdown
# Daily Experiment Status
Date: YYYY-MM-DD

## Key Metrics
- Total Users: X,XXX
- Conversion Rate: XX.X%
- Statistical Significance: XX%

## Variation Performance
1. Standard First: XX.X% CTR
2. IMAX 3D First: XX.X% CTR
3. IMAX First: XX.X% CTR
4. Digital 3D First: XX.X% CTR

## Alerts
- Any anomalies
- Data quality issues
- Technical problems
```

### Final Results Report
```markdown
# Experiment Results Summary
Duration: MM/DD - MM/DD

## Overview
- Total Users: XX,XXX
- Confidence Level: XX%
- Winner: Variation X

## Business Impact
- Expected CTR improvement: +X.X%
- Revenue impact: $XX,XXX
- Implementation cost: $X,XXX

## Recommendations
1. Short-term actions
2. Long-term strategy
3. Follow-up experiments
```

## Best Practices

1. **Data Quality**
   - Validate tracking implementation
   - Monitor for anomalies
   - Document assumptions

2. **Analysis Process**
   - Start with hypothesis
   - Consider external factors
   - Document methodology

3. **Decision Making**
   - Set clear success criteria
   - Consider all stakeholders
   - Plan for implementation

## Tools and Resources

1. **Statistical Analysis**
   - A/B testing calculators
   - Confidence interval tools
   - Significance testing

2. **Visualization**
   - Data Studio
   - Tableau
   - Custom dashboards

3. **Documentation**
   - Experiment log
   - Analysis templates
   - Result sharing
