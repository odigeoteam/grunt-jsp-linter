<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="w" uri="http://www.odigeo.com/jsp/widget"%>
<%@ taglib prefix="tr" uri="http://www.odigeo.com/jsp/translation" %>
<%@ taglib prefix="cm" uri="http://www.odigeo.com/jsp/common" %>

<c:set var="brandId" value="${test['com.odigeo.model.Test'].test.test}" />
<%--
   </div>
 --%>
<w:widgetOptions value="test" />

<div class="test" ${test ? 'test' : ''}>
</div>

<%--IGNOREJSPLINTER--%><c:if test="{condition}">
  <div class"wrap-if-condition">
</c:if><%--IGNOREJSPLINTER--%>
    
    <div>This is allways shown</div>

<%--IGNOREJSPLINTER--%><c:if test="{condition}">
  <div class"wrap-if-condition">
</c:if><%--IGNOREJSPLINTER--%>
