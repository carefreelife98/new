import axios from "axios";
import GoogleAnalyticsResponseDto from "./response/google/google-analytics.response.dto";

export const getGoogleAnalyticsData = async () => {
    const result = await axios
        .post('https://accounts.google.com/o/oauth2/token',
            {
                "client_id": `${process.env.REACT_APP_OAUTH_CLIENT_ID}`,
                "client_secret": `${process.env.REACT_APP_OAUTH_CLIENT_SECRET}`,
                "refresh_token": `${process.env.REACT_APP_OAUTH_REFRESH_TOKEN}`,
                // "grant_type"은 "refresh_token"으로, 이 코드와 동일하게 작성해주면 된다.
                "grant_type": "refresh_token"
            }
        )
        .then((response) => {
            return axios
                .post(`https://analyticsdata.googleapis.com/v1beta/properties/${process.env.REACT_APP_GOOGLE_ANALYTICS_PROPERTY}:runReport`,
                    {
                        "dimensions": [{"name": "date"}],
                        "metrics": [{"name": "totalUsers"}, {"name": "screenPageViews"}, {"name": "sessions"}],
                        "dateRanges": [{"startDate": "2024-01-01", "endDate": "today"}],
                        "keepEmptyRows": true,
                        "orderBys": [{"dimension": {"orderType": "ALPHANUMERIC", "dimensionName": "date"}}],
                        "metricAggregations": ["TOTAL"]
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${response.data.access_token}`
                        }
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    const responseBody: GoogleAnalyticsResponseDto = response.data;
                    return responseBody;
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
};