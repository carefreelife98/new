import { getGoogleAnalyticsData } from "../../apis";
import { useEffect, useState } from "react";
import GoogleAnalyticsResponseDto from "../../apis/response/google/google-analytics.response.dto";
import {setLocalStorageItem, validLocalStorageItem} from "../../util/localStorage/manageLocalStorageItem";

export default function GoogleAnalytics() {

    // state: Google Analytics 사용자 분석 데이터 상태
    const [googleAnalyticsData, setGoogleAnalyticsData] = useState<GoogleAnalyticsResponseDto | null | void>(null);

    useEffect(() => {
        const googleAnalyticsLocalData = localStorage.getItem('__GAData');

        // localStorage에 저장된 데이터가 있으면 사용, 없으면 Google Analytics Data 호출.
        if (googleAnalyticsLocalData) {
            try {
                // 먼저 전체 객체를 파싱
                const storedObj = JSON.parse(googleAnalyticsLocalData);

                const isValidGAData: boolean = validLocalStorageItem(storedObj.expire);

                if (isValidGAData) {
                    // 만료되지 않았으면 value를 다시 파싱하여 실제 데이터 가져오기
                    const localData: GoogleAnalyticsResponseDto = JSON.parse(storedObj.value);
                    console.log('로컬 데이터:', localData);
                    setGoogleAnalyticsData(localData);
                } else {
                    // 만료되었으면 localStorage에서 제거하고 새로운 데이터 가져오기
                    console.warn('로컬 데이터가 만료되었습니다. 새로운 데이터를 가져옵니다.');
                    localStorage.removeItem('__GAData');
                    fetchNewGoogleAnalyticsData();
                }
            } catch (error) {
                console.error('localStorage 데이터 파싱 에러:', error);
                // 파싱에 실패했으면 데이터를 제거하고 새로운 데이터 가져오기
                localStorage.removeItem('__GAData');
                fetchNewGoogleAnalyticsData();
            }
        } else {
            // localStorage에 데이터가 없으면 API 호출
            fetchNewGoogleAnalyticsData();
        }
    }, []);

    // 새로운 데이터를 가져오는 함수
    const fetchNewGoogleAnalyticsData = () => {
        getGoogleAnalyticsData().then((response) => {
            console.log('API 응답:', response);
            setGoogleAnalyticsData(response);
            if (response) {
                // localStorage에 데이터 저장 (1시간 유효)
                setLocalStorageItem('__GAData', JSON.stringify(response), 1);
            }
        }).catch(error => {
            console.error('Google Analytics 데이터 호출 에러:', error);
        });
    }

    return (
        <div id='cfl-tech-blog-google-analytics-data'>
            {googleAnalyticsData ?
                <div>
                    {googleAnalyticsData.totals && googleAnalyticsData.totals.length > 0 ? (
                        <div>
                            <div>총 방문 횟수: {googleAnalyticsData.totals[0].metricValues[0]?.value}</div>
                            <div>전체 조회수: {googleAnalyticsData.totals[0].metricValues[1]?.value}</div>
                        </div>
                    ) : (
                        <div>Google Analytics 데이터 호출 에러입니다.</div>
                    )}
                </div>
                :
                <div>아직 데이터가 존재하지 않습니다.</div>
            }
        </div>
    );
}
